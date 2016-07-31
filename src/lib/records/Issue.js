import { List, Record } from 'immutable'

import Comment from './Comment'
import User from './User'
import Label from './Label'

export const STATE = {
  CLOSE: 'close',
  OPEN: 'open',
}

const _Issue = Record({
  id: null,
  title: '',
  status: STATE.CLOSE,
  created: '',
  updated: '',
  comments: new List(),
  content: '',
  assignee: new User(),
  labels: new List(),
  comment_count: 0,
})

export default class Issue extends _Issue {
  static fromJS(issue = {}) {
    let comments = new List()
    let labels = new List()

    if (issue.comments) {
      comments = new List(issue.comments.map((comment) => {
        return Comment.fromJS(comment)
      }))
    }

    if (issue.labels) {
      labels = new List(issue.labels.map((label) => {
        return Label.fromJS(label)
      }))
    }

    return (new this).merge({
      id: parseInt(issue.id),
      title: issue.title,
      status: issue.status,
      created: issue.created,
      updated: issue.updated,
      content: issue.content,
      comment_count: issue.comment_count,
      comments,
      labels,
      assignee: issue.assignee ? User.fromJS(issue.assignee) : new User(),
    })
  }

  isValidTitle() {
    return this.title.length > 0
  }

  isValidContent() {
    return this.content.length > 0
  }
}
