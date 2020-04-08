# deputados_api_react_native
Aplicativo desenvolvido em [React Native](https://reactnative.dev) afim de consumir as API's RESTFull do site [Dados Abertos](https://dadosabertos.camara.leg.br/swagger/api.html) para listar os deputados em vigor, mostrar seus dados e seus gastos. </br>

# :question: Porque?
Este aplicativo foi desenvolvido para testar o aprendizado e alguns modulos do [React Native](https://reactnative.dev) (veja a seção de módulos).

# :fire: Demo 
![Demo](https://github.com/diegodls/deputados_api_react_native/blob/assets/deputados_api_react_native_gif.gif)

# :tada: Iniciando
Para executar este aplicativo. você deverá ter um ambiente de [trabalho configurado](https://www.google.com/) para o desenvolvimento em [React Native](https://reactnative.dev).</br>
No meu caso, utilizei um dispositivo físico com sistema operacional Android para testes, mas você pode usar um emulador.</br></br>
**Começando:**
* Clone o repositório com o comando `git clone` ([veja mais](https://help.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository))
* Abra um prompt de comando (famoso cmd) na pasta raiz ou navegue até ela, e insira o comando `npx isntall` ou `npm install` ou `yarn install`, dependendo do gerenciador de pacotes que você usa, este comando serve para instalar os pacotes/módulos utilizado nesse projeto
* Após a instalação dos pacotes/módulos, você pode executar no emulador/dispositivo com o comando `npx react-native run-android`

# :hammer: Módulos
Neste projeto foram utilizado os seguintes módulos:</br>
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - *utilização de ícones*</br>
[react-navigation-shared-element](https://github.com/IjzerenHein/react-navigation-shared-element) - *transição de elementos entre uma tela e outra*</br>
[react-navigation@4](https://reactnavigation.org/) - *navegação entre telas*</br>
[lottie-react-native](https://github.com/react-native-community/lottie-react-native) - *uso de animações no aplicativos*</br>
[react-navigation-hooks](https://github.com/react-navigation/hooks) - *hooks de navegação*</br>
[react-native-tab-view](https://github.com/react-native-community/react-native-tab-view) - *abas para informações (não para navegação)*</br>
[moment](https://momentjs.com/) - *formatação de datas*</br>
**E todas as dependências desses módulos que estão presentes em suas respectivas paginas.**

# :clap: Agradecimentos
Gostaria de agradecer todos os desenvolvedores dos módulos acima.

# :orange_book: Notas/Problemas
Foi utilizado uma versão desatualizada do react-native-navigation devido ao modulo react-navigation-shared-element não ser compatível com a versão mais atualizada até o momento do desenvolvimento deste aplicativo. </br>
Até a data de publicação deste aplicativo, o componente `Flatlist` tem um bug que não permite a memorização da rolagem, sendo renderizado toda vez que é adicionado um novo item, o que faz com que toda vez que é carregado novos gastos, ele automaticamente volta para o topo.
Como dito acima, este alicativo foi desenvolvido e testado em um dispositivo com sistema Android, podendo haver problemas em outros sistemas/dispositivos/emuladores, caso ocorra, abra uma Issue ou um Pull/Request.

# :warning: Licença
Você pode usar este aplicativos para estudos, e apenas para estudo, está proibido a sua publicação ou apropriação do código.

# :camera: Screenshots
![Screenshots](https://github.com/diegodls/deputados_api_react_native/blob/assets/deputados_api_react_native_png.png)</br>
