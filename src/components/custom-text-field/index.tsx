import React, { useState, useEffect } from 'react'
import { Box, TextField } from '@material-ui/core'

import './style.scss'

interface Props {
  label: string
  value: string
  maxLength?: number
  placeholder?: string
  obrigatorio?: boolean
  dispararErro?: boolean
  multiline?: boolean
  rows?: number
  select?: boolean
  disabled?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  onChange: (value: string) => void
  onEnterPress?: () => void
  onBlurFormatValue?: (value: string) => void
}

const CustomTextField = (props: Props) => {
  const {
    label,
    placeholder,
    obrigatorio,
    value,
    onChange,
    dispararErro,
    maxLength,
    multiline,
    rows,
    select,
    disabled,
    fullWidth,
    children,
    onEnterPress,
  } = props

  const [estilo, setEstilo] = useState('Normal')
  const [mensagemErro, setMensagemErro] = useState('')

  const setDefault = () => {
    setEstilo('Normal')
    setMensagemErro('')
  }
  const setError = () => {
    setMensagemErro('Required field.')
    setEstilo('Erro')
  }

  const executarAoSair = () => {
    if (obrigatorio && !value) {
      setError()
      return false
    } else setDefault()
    return true
  }

  return (
    <Box className="CustomTextField">
      <TextField
        multiline={multiline}
        className={estilo}
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        rows={rows}
        select={select}
        fullWidth={fullWidth}
        disabled={disabled}
        inputProps={{ maxLength: maxLength }}
        style={{ borderWidth: '1px' }}
        margin="normal"
        placeholder={placeholder}
        onChange={event => {
          onChange(event.target.value)
        }}
        value={value}
        helperText={mensagemErro}
        onFocus={() => setEstilo('Focado')}
        onBlur={executarAoSair}
        onKeyPress={ev => {
          if (ev.key === 'Enter' && onEnterPress) {
            onEnterPress()
            ev.preventDefault()
          }
        }}
      >
        {children}
      </TextField>
    </Box>
  )
}

export default CustomTextField
