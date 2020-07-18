export interface GET {
  '/user/greet/:id': {
    req: { params: { id: string } }
    res: { message: string }
  }
  '/ping': {
    res: { count: number }
  }
}