class UserDto {
    email;
    id;
    isActivated;
    role;
    bookInstances;

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.role = model.role
        this.bookInstances = model.bookInstances
    }

}

module.exports = UserDto