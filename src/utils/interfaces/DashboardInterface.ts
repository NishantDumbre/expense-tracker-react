import ExpenseForm from "../../components/expenses/ExpenseForm";

export interface NavbarProps {
  toggleNavbar: () => void;
}

export interface BackdropProps {
  onClick: () => void;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
}

export interface ModalProps {
  onClick: () => void;
  children: React.ReactNode;
}

export interface ExpenseFormProps{
    formType: string | null,
    onCloseForm: () => void
}