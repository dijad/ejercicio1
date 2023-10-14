class UserEntity {

  constructor(id, name, email, role, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password
    }
  }
}

module.exports = UserEntity;
