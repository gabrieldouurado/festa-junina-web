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
  FlagDateImage,
} from './styles'

import Modal from 'react-modal'

import flagsImg from '../../assets/flags.png'
import fireworksImg from '../../assets/fireworks.png'
import fireplaceImg from '../../assets/fireplace.png'
import flagDateImg from '../../assets/flag-with-date.png'
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
  deleteGuest,
  getAllFoods,
  getAllGuests,
  updateGuest,
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
  id?: string
  name?: string
  peopleQuantity?: any
  foodId?: string
  deletedAt?: Date
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
  const [modalIsOpen, setIsOpen] = useState(false)
  const [currentGuest, setCurrentGuest] = useState<GuestProps | null>(null)

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

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setCurrentGuest(null)
    setIsOpen(false)
  }

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

  function handleOpenModalEdit(guest: GuestProps) {
    setCurrentGuest(guest)
    openModal()
  }

  async function handleEdit() {
    try {
      await updateGuest(
        currentGuest?.id,
        currentGuest?.name,
        parseInt(currentGuest?.peopleQuantity),
        currentGuest?.foodId,
      )

      alert('Editado com sucesso!')
    } catch (error) {
      alert('Ops, ocorreu um problema ao tentar editar!')
    }

    closeModal()
    window.location.reload()
  }

  async function handleDelete() {
    try {
      await deleteGuest(currentGuest?.id)
      alert('Apagado com sucesso')
    } catch (err) {
      alert('Ops, ocorreu um problema ao tentar apagar')
    }
    closeModal()
    window.location.reload()
  }

  return (
    <HomeCotainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Informações"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0 ,0, 0.3)',
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #3f240d',
            borderRadius: '20px',
            gap: '1rem',
          },
        }}
      >
        <h2 style={{ color: '#3f240d' }}>Editar Informações</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            width: '100%',
            padding: '0 1rem',
          }}
        >
          <input
            type="text"
            placeholder="Nome/Família"
            style={{
              height: '3rem',
              padding: '0.5rem',
              border: '2px solid #764319',
              borderRadius: '8px',
            }}
            onChange={(e) => {
              setCurrentGuest({ ...currentGuest, name: e.target.value })
            }}
            value={currentGuest?.name}
          />
          <input
            type="number"
            min={1}
            placeholder="Quantidade de Pessoas"
            style={{
              height: '3rem',
              padding: '0.5rem',
              border: '2px solid #764319',
              borderRadius: '8px',
            }}
            onChange={(e) => {
              setCurrentGuest({
                ...currentGuest,
                peopleQuantity: e.target.value,
              })
            }}
            value={currentGuest?.peopleQuantity}
          />
          <select
            style={{
              height: '3rem',
              padding: '0.5rem',
              border: '2px solid #764319',
              borderRadius: '8px',
            }}
            onChange={(e) => {
              setCurrentGuest({ ...currentGuest, foodId: e.target.value })
            }}
            value={currentGuest?.foodId}
          >
            {foodList.map((comida) => {
              return (
                <option key={comida.id} value={comida.id}>
                  {comida.name}
                </option>
              )
            })}
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <button
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '6px',

              fontWeight: 'bold',
              color: 'green',
              background: 'transparent',

              border: '2px solid green',
            }}
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '6px',

              fontWeight: 'bold',
              color: 'red',
              background: 'transparent',

              border: '2px solid red',
            }}
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>
      </Modal>
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
              placeholder="Nome/Família"
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
                      <PencilLine
                        size={20}
                        onClick={() => handleOpenModalEdit(guest)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </GuestList>
      </HomeContent>
      <HomeFooter>
        <FlagDateImage src={flagDateImg} alt="" />
        <FireplaceImage src={fireplaceImg} alt="" />
      </HomeFooter>
    </HomeCotainer>
  )
}
