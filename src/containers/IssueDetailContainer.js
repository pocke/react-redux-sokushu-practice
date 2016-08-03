import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from 'react-loader'

import IssueDetailHeader from '../components/IssueDetailHeader'
import IssueCommentList from '../components/IssueCommentList'
import IssueCommentForm from '../components/IssueCommentForm'
import IssueDescription from '../components/IssueDescription'

import {
  findIssueDetail,
  addComment,
  updateComment,
  deleteComment,
  changeTitleEditing,
  updateIssue,
  setShowUsersModal,
  setShowLabelsModal,
  setCommentErrors,
} from '../actions/issueDetail'

import styles from './IssueDetailContainer.scss'

class IssueDetailContainer extends Component {
  componentDidMount() {
    this.init()
  }

  init() {
    this.props.findIssueDetail(this.props.params.id)
  }

  onClickCommentSave(comment) {
    this.props.updateComment(this.props.issueDetail, comment)
  }

  onClickCommentAdd(comment) {
    this.props.addComment(this.props.issueDetail, comment)
  }

  onClickCommentDelete(comment) {
    console.log('hogehgoe');
    this.props.deleteComment(this.props.issueDetail, comment)
  }

  onClickTitleEdit() {
    this.props.changeTitleEditing(true)
  }

  onClickTitleSave(issue) {
    this.props.changeTitleEditing(false)
    this.props.updateIssue(issue)
  }

  onClickChangeStatus(issue) {
    this.props.updateIssue(issue)
  }

  onAssigneeSelected(issue) {
    this.props.updateIssue(issue)
  }

  onLabelsSelected(issue) {
    this.props.updateIssue(issue)
  }

  onChangeShowUsersModal(show) {
    // TODO: implement
  }

  onChangeShowLabelsModal(show) {
    // TODO: implement
  }

  setCommentErrors(errors) {
    console.log('errors in container',errors);
    this.props.setCommentErrors(errors);
  }

  render() {
    const { issueDetail, issueDetailManager, issueManager } = this.props
    return (
      <div className={styles.base}>
        <Link to="/">List Page</Link>
        <Loader loaded={!issueDetailManager.loading}>
          <IssueDetailHeader
            issue={issueDetail}
            issueManager={issueManager}
            issueDetailManager={issueDetailManager}
            isTitleEditing={issueDetailManager.isTitleEditing}
            onClickTitleEdit={this.onClickTitleEdit.bind(this)}
            onClickTitleSave={this.onClickTitleSave.bind(this)}
            onAssigneeSelected={this.onAssigneeSelected.bind(this)}
            onLabelsSelected={this.onLabelsSelected.bind(this)}
            onChangeShowUsersModal={this.onChangeShowUsersModal.bind(this)}
            onChangeShowLabelsModal={this.onChangeShowLabelsModal.bind(this)}
          />
          <div className={styles.main}>
            <IssueDescription
              issue={issueDetail}
            />
            <IssueCommentList
              comments={issueDetail.comments}
              onClickSave={this.onClickCommentSave.bind(this)}
              onClickDelete={this.onClickCommentDelete.bind(this)}
            />
            <IssueCommentForm
              issue={issueDetail}
              issueDetailManager={issueDetailManager}
              onClickComment={this.onClickCommentAdd.bind(this)}
              onClickChangeStatus={this.onClickChangeStatus.bind(this)}
              setCommentErrors={this.setCommentErrors.bind(this)}
            />
          </div>
        </Loader>
      </div>
    )
  }
}

IssueDetailContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    issueDetail: state.issue.issueDetail,
    issueDetailManager: state.issue.issueDetailManager,
    issueManager: state.issue.issueManager,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    findIssueDetail,
    addComment,
    updateComment,
    deleteComment,
    changeTitleEditing,
    updateIssue,
    setShowUsersModal,
    setShowLabelsModal,
    setCommentErrors,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueDetailContainer, styles)
