# USE CASES

```
import React from 'react'
import useContext from '../index'
import PokemonList from '../components/PokemonList'

const PokemonListContext = () => {
  const props = useContext({ pokemons: ['pokemons'], cities: ['cities'] })
  return <PokemonList {...props} />
}

export default PokemonListContext
```

```
import React from 'react'
import useContext from '../index'
import AddPokemon from '../components/AddPokemon'
import { addPokemon } from '../actions'

const AddPokemonContext = () => {
  const props = useContext({}, { addPokemon })
  return <AddPokemon {...props} />
}

export default AddPokemonContext
```
