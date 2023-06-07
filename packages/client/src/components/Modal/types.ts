import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  title?: string
  children: ReactNode
  onClose: VoidFunction
}
