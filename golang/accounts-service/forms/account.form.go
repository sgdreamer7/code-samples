package forms

type AccountCreateForm struct {
  Name string `json:"name" binding: "required"`
  Email string `json:"email" binding: "required"`
  Password string `json:"password" binding: "required"`
  RefreshToken string `json:"refresh_token"`
  PasswordConfirmationToken string `json:"password_confirmation_token"`
}

type AccountQueryForm struct {
  Email *string `form:"email,omitempty"`
  RefreshToken *string `form:"refresh_token,omitempty"`
}
