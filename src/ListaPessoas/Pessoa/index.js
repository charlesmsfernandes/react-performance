import { memo } from "react";

function Pessoa ({nome, deletar, id}) {
  console.log('Pessoa adicionada com o nome = ', nome)
   return (
     <li className="box mb-3">
       {nome}
       <button
         className='button is-danger ml-2'
         onClick={() => deletar(id)}>
         Me delete!
       </button>
     </li>
   )
};

//memo pega os componentes antes da renderização e 
//pega os componentes que vão ser renderizados e
//compara os 2 e renderiza somente o que precisa
//Neste caso ele vai pegar o Nome Maria e vai comparar com Maria
//Com isso ele não vai renderizar novamente esse nome
//Importante, o memo não funciona com funções, pois ao passar
//um função por parâmetro, não é a função q é passada e sim
//a referência para essa função
export default memo(Pessoa);