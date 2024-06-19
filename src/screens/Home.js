import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { auth, storage, db } from '../firebase';

import '../styles/Home.css';
import IconSoloSnapShare from '../icons/icon-solo-SnapShare.svg';

const Home = (props) => {
    const [openModalPublicar, setOpenModalPublicar] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comentarios, setComentarios] = useState({});

    useEffect(() => {
        const unsubscribePosts = db.collection('posts').orderBy('time', 'desc').onSnapshot((snapshot) => {
            const postsData = snapshot.docs.map((document) => {
                return {
                    id: document.id,
                    dados: document.data()
                };
            });
            console.log("Posts recuperados: ", postsData); // Adicionado console.log
            setPosts(postsData);
        });

        return () => unsubscribePosts();
    }, []);

    useEffect(() => {
        const unsubscribeComments = posts.map(post => {
            return db.collection('posts').doc(post.id).collection('comentario').onSnapshot((snapshot) => {
                setComentarios(prevComentarios => ({
                    ...prevComentarios,
                    [post.id]: snapshot.docs.map((document) => {
                        return {
                            id: document.id,
                            info: document.data()
                        };
                    })
                }));
            });
        });

        return () => {
            unsubscribeComments.forEach(unsubscribe => unsubscribe());
        };
    }, [posts]);


    const uploadPost = (e) => {
        e.preventDefault();

        let titlePost = document.getElementById("titlePost").value;
        let descricaoPost = document.getElementById("descricaoPost").value;

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        }, (error) => {
            alert('Erro ao realizar a publicação ', error);
        }, () => {
            storage.ref('images').child(file.name).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    titlePost: titlePost,
                    descricaoPost: descricaoPost,
                    image: url,
                    userName: props.user,
                    time: firebase.firestore.FieldValue.serverTimestamp()
                });
            });

            setProgress(0);
            setFile(null);
            alert('Upload Realizado Com Sucesso!');

            document.getElementById("form-upload").reset();
        });
    }

    const deslogar = (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            props.setUser(null);
        });
    }

    const comentar = (id, e) => {
        e.preventDefault();

        let comentarioPost = document.getElementById("comentario-" + id).value;

        db.collection('posts').doc(id).collection('comentario').add({
            nameUser: props.user,
            comentario: comentarioPost
        });

        document.getElementById("comentario-" + id).value = "";
    }

    return (
        <div className="container-home">
            <div className="header">
                <h1 className="title">
                    <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={IconSoloSnapShare} width={100} style={{ margin: '0 10px' }} />
                        SnapShare
                        <img style={{ margin: '0 10px' }} src={IconSoloSnapShare} width={100} />
                    </h1>
                </h1>
            </div>

            <p>Olá, {props.user}!</p>

            <div className="container-buttons">
                <button className="btn-post" onClick={() => setOpenModalPublicar(!openModalPublicar)}>
                    {openModalPublicar ? 'Fechar' : 'Postar'} Publicação
                </button>
                <button className="btn-post" onClick={(e) => deslogar(e)}>Sair</button>
            </div>

            {openModalPublicar &&
                <div id="container-publicar" className="modal-publicar">
                    <form onSubmit={(e) => uploadPost(e)} id="form-upload">
                        <progress value={progress} id="progress" max="100"></progress>

                        <label>Título</label>
                        <input type="text" id="titlePost" placeholder="Insira um Título para sua Publicação..." />

                        <label>Imagem:</label>
                        <input type="file" id="imagePost" onChange={(e) => setFile(e.target.files[0])} placeholder="Image..." />

                        <label>Descrição</label>
                        <textarea placeholder="Insira uma descrição para sua publicação..." id="descricaoPost"></textarea>

                        <button type="submit">Publicar</button>
                        <button type="button" onClick={() => setOpenModalPublicar(false)}>Fechar Publicação</button>
                    </form>
                </div>
            }

            <div id="container-visualizar-posts">
                {posts.map((val) => {
                    return (
                        <div className="container-solo-post" key={val.id}>
                            <hr />
                            <h3>{val.dados.titlePost}</h3>
                            <img src={val.dados.image} alt="Post" style={{ width: '340px', height: '300px' }} />
                            <p>{val.dados.descricaoPost}</p>
                            <p>ID DO POST: {val.id}</p>
                            <p>Data: <strong>{val.dados.time?.toDate().toLocaleString()}</strong></p>
                            <p>Usuário: <strong>{val.dados.userName}</strong></p>
                            <div style={{ border: '1px solid black' }}>
                                <h5>Comentários:</h5>
                                {
                                    comentarios[val.id] && comentarios[val.id].map((comment) => {
                                        return (
                                            <p key={comment.id}><strong>{comment.info.nameUser}:</strong> {comment.info.comentario}</p>
                                        )
                                    })
                                }
                            </div>
                            <br />
                            <form onSubmit={(e) => comentar(val.id, e)}>
                                <textarea style={{ width: '98%' }} id={"comentario-" + val.id}></textarea> <br />
                                <button>Comentar</button>
                            </form>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;
