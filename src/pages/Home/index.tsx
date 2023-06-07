import {
  HomeCotainer,
  FlagsImage,
  FireworksImage,
  HomeHeader,
  HomeFooter,
  FireplaceImage,
  HomeContent,
  PeopleOrFamily,
  PeopleQuantity,
  PeopleContribuition,
  GuestList,
  LogoImage,
} from './styles'

import flagsImg from '../../assets/flags.png'
import fireworksImg from '../../assets/fireworks.png'
import fireplaceImg from '../../assets/fireplace.png'
import logoImg from '../../assets/logo.png'

import { BasicFrom } from '../../components/BasicForm'
import { BasicButton } from '../../components/BasicButton'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PencilLine } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import {
  createNewGuest,
  getAllFoods,
  getAllGuests,
} from '../../helpers/apiHelper'

const partyFormSchema = z.object({
  name: z.string().nonempty('Opa! Diz pra gente quem é você'),
  peopleQuantity: z
    .string()
    .min(1, 'Ei, lembra de dizer quantas pessoas irão contigo'),
  foodId: z
    .string()
    .nonempty('Pode contribuir com nossa festa? Escolha algo pra levar'),
})

type PartyFormInputs = z.infer<typeof partyFormSchema>

interface GuestProps {
  id: string
  name: string
  peopleQuantity: string
  foodId: string
}

interface FoodProps {
  id: string
  name: string
  quantity: number
}

export function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartyFormInputs>({
    resolver: zodResolver(partyFormSchema),
  })

  const [foodList, setFoodList] = useState<FoodProps[]>([])
  const [guestList, setGuestList] = useState<GuestProps[]>([])

  const fetchAllFoods = useCallback(async () => {
    const allFoods = await getAllFoods()
    setFoodList(allFoods)
  }, [])

  const fetchAllGuest = useCallback(async () => {
    const allGuests = await getAllGuests()
    setGuestList(allGuests)
  }, [])

  useEffect(() => {
    fetchAllFoods()
    fetchAllGuest()
  }, [fetchAllFoods, fetchAllGuest])

  async function handleConfirmation(data: PartyFormInputs) {
    const args = {
      name: data.name,
      peopleQuantity: parseInt(data.peopleQuantity),
      foodId: data.foodId,
    }

    try {
      await createNewGuest(args)
      alert(`Presença Confirmada\nAté dia 24/06 ${args.name}`)
    } catch (err) {
      alert(
        'Ops, houve um erro para confirmar sua presença. Tente novamente mais tarde',
      )
    }

    window.location.reload()
    reset()
  }

  function handleEdit(guest: GuestProps) {
    console.log(guest)
  }

  return (
    <HomeCotainer>
      <HomeHeader>
        <FlagsImage src={flagsImg} alt="" />
        <FireworksImage src={fireworksImg} alt="" />
      </HomeHeader>
      <HomeContent>
        <LogoImage src={logoImg} alt="" />
        <BasicFrom action="" onSubmit={handleSubmit(handleConfirmation)}>
          <div>
            <PeopleOrFamily
              type="text"
              placeholder="Nome/Familia"
              {...register('name')}
            />

            <PeopleQuantity
              type="number"
              placeholder="Qnt."
              min={1}
              {...register('peopleQuantity')}
            />

            <PeopleContribuition defaultValue={''} {...register('foodId')}>
              <option value="" disabled hidden>
                Escolha um prato para levar
              </option>

              {foodList.map((comida) => {
                return (
                  <option key={comida.id} value={comida.id}>
                    {comida.name}
                  </option>
                )
              })}
            </PeopleContribuition>
          </div>
          {errors.name && <span>{errors.name.message}</span>}
          {errors.peopleQuantity && (
            <span>{errors.peopleQuantity.message}</span>
          )}
          {errors.foodId && <span>{errors.foodId.message}</span>}
          <BasicButton>Confirmar Presença</BasicButton>
        </BasicFrom>
        <GuestList>
          <table>
            <thead>
              <tr>
                <th>Nome/Família</th>
                <th>Qnt. de Pessoas</th>
                <th>O que irá levar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {guestList.map((guest) => {
                return (
                  <tr key={guest.id}>
                    <td>{guest.name}</td>
                    <td>{guest.peopleQuantity}</td>
                    <td>
                      {
                        foodList.find((comida) => {
                          return comida.id === guest.foodId
                        })?.name
                      }
                    </td>
                    <td>
                      <PencilLine size={20} onClick={() => handleEdit(guest)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </GuestList>
      </HomeContent>
      <HomeFooter>
        <FireplaceImage src={fireplaceImg} alt="" />
      </HomeFooter>
    </HomeCotainer>
  )
}
