// src/services/queries.ts
import { gql } from '@apollo/client';

// User Queries
export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
    }
  }
`;

// Journal Entry Queries
export const GET_JOURNAL_ENTRY = gql`
  query GetJournalEntry($id: ID!) {
    getJournalEntry(id: $id) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;
export const GET_JOURNAL_SUMMARY = gql`
  query GetJournalSummary($userId: ID!) {
    getJournalSummary(userId: $userId) {
      totalEntries
      categories
      mostRecentEntry {
        id
        title
        date
      }
    }
  }
`;

export const GET_ALL_JOURNAL_ENTRIES = gql`
  query GetAllJournalEntries($userId: ID!) {
    getAllJournalEntries(userId: $userId) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;

export const GET_JOURNAL_ENTRIES_BY_DATE_RANGE = gql`
  query GetJournalEntriesByDateRange($userId: ID!, $startDate: String!, $endDate: String!) {
    getJournalEntriesByDateRange(userId: $userId, startDate: $startDate, endDate: $endDate) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;

export const GET_JOURNAL_ENTRIES_BY_CATEGORY = gql`
  query GetJournalEntriesByCategory($userId: ID!, $category: String!) {
    getJournalEntriesByCategory(userId: $userId, category: $category) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;

// User Mutations
export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!, $email: String!) {
    signUp(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`;

export const LOG_IN = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
    }
  }
`;


export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $password: String) {
    updateUser(id: $id, username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

// Journal Entry Mutations
export const ADD_JOURNAL_ENTRY = gql`
  mutation AddJournalEntry($title: String!, $content: String!, $category: String!, $date: String!, $userId: ID!) {
    addJournalEntry(title: $title, content: $content, category: $category, date: $date, userId: $userId) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;

export const UPDATE_JOURNAL_ENTRY = gql`
  mutation UpdateJournalEntry($id: ID!, $title: String, $content: String, $category: String, $date: String) {
    updateJournalEntry(id: $id, title: $title, content: $content, category: $category, date: $date) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;

export const DELETE_JOURNAL_ENTRY = gql`
  mutation DeleteJournalEntry($id: ID!) {
    deleteJournalEntry(id: $id) {
      id
      title
      content
      category
      date
      userId
    }
  }
`;
