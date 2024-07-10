
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
  }

  type JournalEntry {
    id: ID!
    title: String!
    content: String!
    category: String!
    date: String!
    userId: ID!
  }

  type Token {
    token: String!
  }

  type Query {
    getUser(id: ID!): User
    getJournalEntry(id: ID!): JournalEntry
    getAllJournalEntries(userId: ID!): [JournalEntry]
    getJournalEntriesByDateRange(userId: ID!, startDate: String!, endDate: String!): [JournalEntry]
    getJournalEntriesByCategory(userId: ID!, category: String!): [JournalEntry]
  }

  type Mutation {
    signUp(username: String!, password: String!, email: String!): User
    logIn(username: String!, password: String!): Token
    addJournalEntry(title: String!, content: String!, category: String!, date: String!, userId: ID!): JournalEntry
    updateJournalEntry(id: ID!, title: String, content: String, category: String, date: String): JournalEntry
    deleteJournalEntry(id: ID!): JournalEntry
    updateUser(id: ID!, username: String, password: String): User
  }

