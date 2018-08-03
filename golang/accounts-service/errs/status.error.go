package errs

import (
  "fmt"
)

type StatusError struct {
	status int
	message string
}

func (err *StatusError) Error() string {
	return fmt.Sprintf("%v", err.message)
}

func (err *StatusError) Status() int {
	return err.status
}

func NewStatusError(status int, message string) *StatusError {
  return &StatusError{
    status,
    message,
  }
}
