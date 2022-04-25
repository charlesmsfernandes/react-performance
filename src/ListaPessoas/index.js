import {useCallback, useState} from 'react';
import Pessoa from './Pessoa';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

faker.locale = 'pt_BR';

function ListaPessoas() {
  //nosso arrai de nomes estava dessa forma = ["Maria", "João"]
  //isso gera um problema pois ao deletar a Maria que é o index 0
  //o javascript entende que toda a arvore mudou, pois o João passar a ser o 0
  //a prática de usar o index é boa quando o componente não muda para não gerar problemas
  //como isso aconteceu precisamo setar um id para cada usuário
  const [pessoas, setPessoas] = useState([
    {nome: "Maria", id: faker.datatype.uuid()},
    {nome: "João", id: faker.datatype.uuid()},
  ]);

  //Como isso não vai funcionar no nosso memo precisamos usar outra 
  //jeito que o react disponibiliza que é o useCallback
  // const deletarPessoa = (id) => {
  //    setPessoas(listaAnterior => listaAnterior.filter((pessoa, indexAnterior) => indexAnterior !== id))
  // };

  // O useCallback precisa de 2 parâmetros para funcionar
  // 1 - A função que será passada, que no nosso caso é uma função anonima com arrow function
  // 2 - Quando ela deve ser mudada, que vai dentro de [] 
  // Neste exemplo, como não estamos usando nenhuma função nem prop de fora, não precisamos passar nada
  const deletarPessoa = useCallback(id => {
    setPessoas(listaAnterior => listaAnterior.filter(pessoa => pessoa.id !== id))
 }, []);
 
  return (
    <div className='has-text-centered'>
      <ul>
        {
          pessoas.map(pessoa => (
            <Pessoa
              key={pessoa.id}
              id={pessoa.id}
              nome={pessoa.nome}
              deletar={deletarPessoa}
            />
        ))
        }
      </ul>
      <button 
        className='button is-primary is-outlined'
        onClick={() => {
          setPessoas(listaAnterior => ([...listaAnterior, {
            nome: faker.name.firstName(),
            id: faker.datatype.uuid()
          }]))
        }}
      >
        Adicionar Pessoa
      </button>
    </div>
  )
}

export default ListaPessoas