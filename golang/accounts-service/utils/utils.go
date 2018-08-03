package utils

func Unpack(list []string, vars ...*string) {
  for index, value := range list {
    *vars[index] = value
  }
}
