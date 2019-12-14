const storage = {
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const v = window.localStorage.getItem(key)
    return v ? JSON.parse(v) : v
  },
  remove(key: string) {
    window.localStorage.removeItem(key)
  }
}

export default storage
