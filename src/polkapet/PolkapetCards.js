import React, { useState } from 'react'
import {
  Button,
  Card,
  Grid,
  Message,
  Modal,
  Form,
  Label,
} from 'semantic-ui-react'

import PolkapetAvatar from './PolkapetAvatar'
import { useSubstrateState } from '../substrate-lib'
import { TxButton } from '../substrate-lib/components'

// --- Transfer Modal ---

const TransferModal = props => {
  const { polkapet, setStatus } = props
  const [open, setOpen] = React.useState(false)
  const [formValue, setFormValue] = React.useState({})

  const formChange = key => (ev, el) => {
    setFormValue({ ...formValue, [key]: el.value })
  }

  const confirmAndClose = unsub => {
    console.log(formValue.target)
    setOpen(false)
    if (unsub && typeof unsub === 'function') unsub()
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="blue">
          Transfer
        </Button>
      }
    >
      <Modal.Header>Polkapet Transfer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
          <Form.Input
            fluid
            label="Receiver"
            placeholder="Receiver Address"
            onChange={formChange('target')}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Transfer"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'transfer',
            inputParams: [formValue.target, polkapet.id],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

// --- Set Price ---

const SetPrice = props => {
  const { polkapet, setStatus } = props
  const [open, setOpen] = React.useState(false)
  const [formValue, setFormValue] = useState(0)

  const confirmAndClose = unsub => {
    setOpen(false)
    if (unsub && typeof unsub === 'function') unsub()
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="blue">
          Set Price
        </Button>
      }
    >
      <Modal.Header>Set Pet Price</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
          <Form.Input
            fluid
            label="Price"
            placeholder="Enter Price"
            type="number"
            onChange={(_, { value }) => setFormValue(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Set Price"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'setPrice',
            inputParams: [polkapet.id, formValue],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

// --- Buy Pet ---

const BuyPolkapet = props => {
  const { polkapet, setStatus } = props
  const [open, setOpen] = React.useState(false)

  const confirmAndClose = unsub => {
    setOpen(false)
    if (unsub && typeof unsub === 'function') unsub()
  }

  if (!polkapet.price) {
    return <></>
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="green">
          Buy Pet
        </Button>
      }
    >
      <Modal.Header>Buy Pet</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
          <Form.Input fluid label="Price" readOnly value={polkapet.price} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Buy Pet"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'buyPolkapet',
            inputParams: [polkapet.id, polkapet.price],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}

// const RemovePrice = props => {
//   const { pet, setStatus } = props
//   const [open, setOpen] = React.useState(false)

//   const confirmAndClose = unsub => {
//     setOpen(false)
//     if (unsub && typeof unsub === 'function') unsub()
//   }

//   if (!pet.price) {
//     return <></>
//   }

//   return (
//     <Modal
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       open={open}
//       trigger={
//         <Button basic color="green">
//           Remove Price
//         </Button>
//       }
//     >
//       <Modal.Header>Remove Price</Modal.Header>
//       <Modal.Content>
//         <Form>
//           <Form.Input fluid label="Pet ID" readOnly value={pet.id} />
//         </Form>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button basic color="grey" onClick={() => setOpen(false)}>
//           Cancel
//         </Button>
//         <TxButton
//           label="Remove Price"
//           type="SIGNED-TX"
//           setStatus={setStatus}
//           onClick={confirmAndClose}
//           attrs={{
//             palletRpc: 'polkapetModule',
//             callable: 'removePrice',
//             inputParams: [pet.id],
//             paramFields: [true],
//           }}
//         />
//       </Modal.Actions>
//     </Modal>
//   )
// }
const EmpowerPet = props => {
  const { polkapet, setStatus } = props
  const [open, setOpen] = React.useState(false)

  const confirmAndClose = unsub => {
    setOpen(false)
    if (unsub && typeof unsub === 'function') unsub()
  }



  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="green">
          Empower
        </Button>
      }
    >
      <Modal.Header>Empower</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Empower Pet"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'empower',
            inputParams: [polkapet.id],
            paramFields: [true],
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}
// --- About Pet Card ---

const PetCard = props => {
  const { polkapet, setStatus } = props
  const {id = null, dna = null, owner = null, gender = null, price = null,  death, respawn, power, ovalPosition} = polkapet
  const displayDna = dna && dna.toJSON()
  const { currentAccount } = useSubstrateState()
  const isSelf = currentAccount.address === polkapet.owner

  return (
    <Card style={{width:"350px", height:"400px"}}>
      {isSelf && (
        <Label as="a" floating color="teal">
          Mine
        </Label>
      )}

      <PolkapetAvatar dna={dna.toU8a()} />

      <Card.Content>
        <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
          DNA: {displayDna}
        </Card.Meta>
        <Card.Description>
          <p style={{ overflowWrap: 'break-word' }}>Pet_id: {id}</p>
          <p style={{ overflowWrap: 'break-word' }}>Gender: {gender}</p>
          <p style={{ overflowWrap: 'break-word' }}>{"Death: "  + death  +" - " +"Respawn: " +respawn}</p>
          <p style={{ overflowWrap: 'break-word' }}>{"Oval Position: " +ovalPosition +" - " +"Power: "  + power }</p>
          <p style={{ overflowWrap: 'break-word' }}>
            Price: {price || 'Not For Sale'}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ textAlign: 'center' }}>
        {owner === currentAccount.address ? (
          <>
            <SetPrice polkapet={polkapet} setStatus={setStatus} />
            <EmpowerPet polkapet={polkapet} setStatus={setStatus} />
            {/* <RemovePrice pet={pet} setStatus={setStatus} /> */}
            <TransferModal polkapet={polkapet} setStatus={setStatus} />
          </>
        ) : (
          <>
            <BuyPolkapet polkapet={polkapet} setStatus={setStatus} />
          </>
        )}
      </Card.Content>
    </Card>
  )
}

const PolkapetCards = props => {
  const { polkapets, setStatus } = props

  if (polkapets.length === 0) {
    return (
      <Message info>
        <Message.Header>
          No Kitty found here... Create one now!&nbsp;
          <span role="img" aria-label="point-down">
            👇
          </span>
        </Message.Header>
      </Message>
    )
  }

  return (
    <Grid columns={3}>
      {polkapets.map((polkapet, i) => (
        <Grid.Column key={`polkapet-${i}`}>
          <PetCard polkapet={polkapet} setStatus={setStatus} />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default PolkapetCards
