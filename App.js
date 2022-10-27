//Jogo do Galo app//
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

//
export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');
  var [contadorX, setContadorX] = useState(0);
  var [contadorO, setContadorO] = useState(0);

  function inicarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    //Validacao de linhas
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    //Validacao de colunas
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }
    //Validacao da diagonal 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    //Validacao da diagonal 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }
    //Nenhum Ganhador
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }
    //Jogo nao finalizado
    setJogadasRestantes((jogadasRestantes - 1));

  }
  function finalizarJogo(jogador) {
    setGanhador(jogador);
    if (jogador == 'X') {
      setContadorX((contadorX + 1));
    }
    if (jogador == 'O') {
      setContadorO((contadorO + 1));
    }
    setTela('score')

  }
  function resetarScore() {
    setContadorX((contadorX = 0));
    setContadorO((contadorO = 0));

  }


  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'score':
      return getTelaScore();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo do Galo꧂</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>


        <View style={styles.inLineItems}>

          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => inicarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => inicarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}></Text>

        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inLineItems}>

                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity
                        key={numeroColuna}
                        style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)}
                        disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )

                  })
                }

              </View>

            )
          })
        }
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao Menu</Text>
        </TouchableOpacity>


      </View>
    );
  }

  function getTelaScore() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo do Galo꧂</Text>

        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum ganhador</Text>
        }

        {
          ganhador !== '' &&
          <>
            <Text style={styles.ganhador}>Ganhador da partida:</Text>
            <View
              style={styles.boxJogador}>
              <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }

        <Text style={styles.placar}>Total jogador X: {contadorX}</Text>
        <Text style={styles.placar}>Total jogador O: {contadorO}</Text>

        <TouchableOpacity
          style={styles.botaoReset}
          onPress={() => resetarScore()}>
          <Text style={styles.textoBotaoReset}>Resetar Score</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Jogar Novamente</Text>
        </TouchableOpacity>

      </View>
    );
  }

}
//STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'fantasy'
  },
  subtitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
    fontFamily: 'fantasy'
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  jogadorX: {
    fontSize: 50,
    color: 'black',
    fontWeight: 'bold'
  },
  jogadorO: {
    fontSize: 50,
    color: '#d61c85',
    fontWeight: 'bold'
  },
  inLineItems: {
    flexDirection: 'row'
  },
  botaoReset: {
    marginTop: 20
  },
  textoBotaoReset: {
    color: '#03fc20'
  },
  botaoMenu: {
    marginTop: 60
  },
  textoBotaoMenu: {
    fontSize: 20,
    color: '#347deb'
  },
  ganhador: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  placar: {
    marginTop: 20
  }
});


