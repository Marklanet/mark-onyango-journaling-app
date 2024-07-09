# API Documentation

## Overview

This document provides details about the GraphQL API endpoints for the Personal Journaling App backend. The API allows users to manage their profiles and journal entries.

## Schema

### Types

#### `User`

`````graphql
type User {
  id: ID!
  username: String!
  password: String!
  email: String!
}

#### `JournalEntry`

````graphql
type JournalEntry {
  id: ID!
  title: String!
  content: String!
  category: String!
  date: String!
  userId: ID!
}````

#### `Token`

````graphql

type Token {
  token: String!
},

Queries
getUser

Fetches a user by ID.

graphql

getUser(id: ID!): User

Example Query:

graphql

query {
  getUser(id: "1") {
    id
    username
    email
  }
}

getJournalEntry

Fetches a journal entry by ID.

graphql

getJournalEntry(id: ID!): JournalEntry

Example Query:

graphql

query {
  getJournalEntry(id: "1") {
    id
    title
    content
    category
    date
    userId
  }
}

getAllJournalEntries

Fetches all journal entries for a specific user.

graphql

getAllJournalEntries(userId: ID!): [JournalEntry]

Example Query:

graphql

query {
  getAllJournalEntries(userId: "1") {
    id
    title
    content
    category
    date
  }
}

getJournalEntriesByDateRange

Fetches journal entries for a user within a specified date range.

graphql

getJournalEntriesByDateRange(userId: ID!, startDate: String!, endDate: String!): [JournalEntry]

Example Query:

graphql

query {
  getJournalEntriesByDateRange(userId: "1", startDate: "2024-01-01", endDate: "2024-01-31") {
    id
    title
    content
    category
    date
  }
}

getJournalEntriesByCategory

Fetches journal entries for a user by category.

graphql

getJournalEntriesByCategory(userId: ID!, category: String!): [JournalEntry]

Example Query:

graphql

query {
  getJournalEntriesByCategory(userId: "1", category: "Work") {
    id
    title
    content
    date
  }
}

Mutations
signUp

Creates a new user.

graphql

signUp(username: String!, password: String!, email: String!): User

Example Mutation:

graphql

mutation {
  signUp(username: "john_doe", password: "password123", email: "john@example.com") {
    id
    username
    email
  }
}

logIn

Logs in a user and returns a JWT token.

graphql

logIn(username: String!, password: String!): Token

Example Mutation:

graphql

mutation {
  logIn(username: "john_doe", password: "password123") {
    token
  }
}

addJournalEntry

Adds a new journal entry.

graphql

addJournalEntry(title: String!, content: String!, category: String!, date: String!, userId: ID!): JournalEntry

Example Mutation:

graphql

mutation {
  addJournalEntry(title: "First Entry", content: "This is my first entry", category: "Personal", date: "2024-07-09", userId: "1") {
    id
    title
    content
    category
    date
  }
}

updateJournalEntry

Updates an existing journal entry.

graphql

updateJournalEntry(id: ID!, title: String, content: String, category: String, date: String): JournalEntry

Example Mutation:

graphql

mutation {
  updateJournalEntry(id: "1", title: "Updated Entry", content: "This is the updated content") {
    id
    title
    content
    category
    date
  }
}

deleteJournalEntry

Deletes a journal entry.

graphql

deleteJournalEntry(id: ID!): JournalEntry

Example Mutation:

graphql

mutation {
  deleteJournalEntry(id: "1") {
    id
    title
    content
    category
    date
  }
}

updateUser

Updates user details.

graphql

updateUser(id: ID!, username: String, password: String): User

Example Mutation:

graphql

mutation {
  updateUser(id: "1", username: "john_doe_updated", password: "new_password123") {
    id
    username
    email
  }
}

Authentication

Authentication is handled via JWT tokens. Users must include the token in the Authorization header for all authenticated requests.

Example Header:

makefile

Authorization: Bearer <your-jwt-token>

Error Handling

Errors will be returned in the standard GraphQL error format. Ensure to handle these errors appropriately in your client application.

json

{
  "errors": [
    {
      "message": "Authentication error: Invalid token",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "getUser"
      ]
    }
  ],
  "data": null
}

`````
