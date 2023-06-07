var { buildSchema } = require("graphql");
const ContactModel = require("../models/Contact");

var schema = buildSchema(`
input ContactInput {
  name: String
  phone: String
}

type Contact {
  _id: ID!
  name: String
  phone: String
}

type Query {
  getContacts: [Contact],
  getContact(id: ID!): Contact

}

type Mutation {
    createContact(input:ContactInput): Contact
    updateContact(id: ID! , input:ContactInput): Contact
    deleteContact(id: ID!): Contact
}
  
`);

class Contact {
    constructor(_id, { name, phone }) {
        this._id = _id;
        this.name = name;
        this.phone = phone;
    } 
} 

var root = {
    getContacts: () => ContactModel.find(),
    getContact: ({ id }) => ContactModel.findById(id),
    createContact: ({ input }) => ContactModel.create(input),
    updateContact: ({ id, input }) =>
        ContactModel.findByIdAndUpdate(id, input, { new: true }),
    deleteContact: ({ id }) => ContactModel.findByIdAndRemove(id),
};

// mutation createContact($name: String!, $phone: String!){
//     createContact(input:{name: $name, phone: $phone}){
//       _id
//       name
//       phone
//     }
//     }


// mutation updateContact($id: ID!, $name: String!, $phone: String!) {
//     updateContact(id: $id, input: {name: $name, phone: $phone}) {
//       _id
//       name
//       phone
//     }
//   }
  
module.exports = { schema, root };
