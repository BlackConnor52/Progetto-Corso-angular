export class Utente {
  id!: number 
  nome!: string
  cognome!: string
  dataNascita!: Date
  luogoNascita!: string
  cf!: string
  stipendio!: number
  username!: string
  email!: string
  password!: string
  ruolo?:string | null ="Seleziona"
  titolo!:string
  settore?:string | null ="Seleziona"

}
