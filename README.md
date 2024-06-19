<h1>Plataforma Rede Social SnapShare</h1>
<h6>Versão 1.0</h6>

<h4>Mais Informações:</h4>
<ul>
  <li>Front End Feito em ReactJS & CSS</li>
  <li>Back End Feito Com Firebase</li>
</ul>

<h4>Imagens do Projeto:</h4>
<img src=""/>

<h4>Live Demo:</h4>
<a href="https://snap-share-blue.vercel.app/">Live Demo</a>


<h3>Firebase:</h3>
<p>O Firebase é um Back End é um conjunto de serviços back-end de computação em nuvem e plataformas de desenvolvimento fornecido pelo Google. É uma ótima plataforma para desenvolver
projetos que envolvem back-end, projetada para ajudá-lo durante toda a jornada de desenvolvimento.
O Firebase tem serviço de: FireStore, Hosting, Realtime Database, Cloud Strorage, Authentication, App Check, entre diversos outros.
Sendo gratuita por uma certa quantidade de requisição, com o seu sistema de Arquitetura de Cloud, que você paga pelo quantidade que usa.</p>

<h3>Dependências do Projeto:</h3>
<ul>
  <li>npm install firebase@8</li>
  <li>npm install react-router-dom</li>
  <li>npm install react-toastify</li>
</ul>

<h3>Utilizações do Firebase:</h3>
<ul>
  <li>Firebase auth - Para autentificação, criação e login de usuários.</li>
  <li>Firebase storage - Para upload de arquivos.</li>
  <li>Firebase store - Para database em tempo real.</li>
  <li>Firebase functions - Para a data e hora que foi publicada o post.</li>
</ul>

<h3>Comandos Aprendidos no Projeto:</h3>
<ul>
  <li>const uploadTask = storage.ref(`images/${file.name}`).put(file);</li>
  <p> - Usado para mandar uma imagem para o firebase, como referência, o que está no file.name. Usando a put(file) para inputar o arquivo no firebase.</p>

  <li>time: firebase.firestore.FieldValue.serverTimestamp()</li>
  <p> - Usado para pegar a data e hora da publicação no firebase.</p>
  
  <li>storage.ref('images').child(file.name).getDownloadURL().then((url) => {</li>
  <p> - Usado para pegar URL gerada para imagem que foi enviada para o firebase.</p>
  
  <li>uploadTask.on("state_changed", (snapshot) => {</li>
  <p> - Usado para pegar o uploadTask, verificar se houve alguma mudança e colocar esse valor no parâmetro snapshot.</p>
  
  <li>auth.signOut().then((val) => {</li>
  <p> - Usado para deslogar o usuário.</p>
</ul>


<h4>Atualização:</h4>
<ul>
  <li>Última Atualização: 19/06/2024</li>
</ul>
