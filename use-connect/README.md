# USE CASES

```
import React from 'react'
import useConnect from '../useConnect'
import PokemonList from '../components/PokemonList'

const PokemonListContext = () => {
  const props = useConnect({ pokemons: ['pokemons'], cities: ['cities'] })
  return <PokemonList {...props} />
}

export default PokemonListContext
```

```
import React from 'react'
import useConnect from '../useConnect'
import AddPokemon from '../components/AddPokemon'
import { addPokemon } from '../actions'

const AddPokemonContext = () => {
  const props = useConnect({}, { addPokemon })
  return <AddPokemon {...props} />
}

export default AddPokemonContext
```
