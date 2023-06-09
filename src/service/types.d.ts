// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

import { MergeRequestState } from "../ui/elements/StatesDropdown";

export interface MergeRequest {
    id:                            number;
    iid:                           number;
    project_id:                    number;
    title:                         string;
    description:                   string;
    state:                         MergeRequestState;
    created_at:                    Date;
    updated_at:                    Date;
    merged_by:                     null;
    merge_user:                    null;
    merged_at:                     null;
    closed_by:                     null;
    closed_at:                     null;
    target_branch:                 string;
    source_branch:                 string;
    user_notes_count:              number;
    upvotes:                       number;
    downvotes:                     number;
    author:                        Author;
    assignees:                     any[];
    assignee:                      null;
    reviewers:                     any[];
    source_project_id:             number;
    target_project_id:             number;
    labels:                        any[];
    draft:                         boolean;
    work_in_progress:              boolean;
    milestone:                     null;
    merge_when_pipeline_succeeds:  boolean;
    merge_status:                  string;
    detailed_merge_status:         string;
    sha:                           string;
    merge_commit_sha:              null;
    squash_commit_sha:             null;
    discussion_locked:             null;
    should_remove_source_branch:   null;
    force_remove_source_branch:    boolean;
    reference:                     string;
    references:                    References;
    web_url:                       string;
    time_stats:                    TimeStats;
    squash:                        boolean;
    squash_on_merge:               boolean;
    task_completion_status:        TaskCompletionStatus;
    has_conflicts:                 boolean;
    blocking_discussions_resolved: boolean;
    approvals_before_merge:        null;
}

export interface Author {
    id:         number;
    username:   string;
    name:       string;
    state:      string;
    avatar_url: string;
    web_url:    string;
}

export interface References {
    short:    string;
    relative: string;
    full:     string;
}

export interface TaskCompletionStatus {
    count:           number;
    completed_count: number;
}

export interface TimeStats {
    time_estimate:          number;
    total_time_spent:       number;
    human_time_estimate:    null;
    human_total_time_spent: null;
}

// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface Project {
    id:                  number;
    description:         null | string;
    name:                string;
    name_with_namespace: string;
    path:                string;
    path_with_namespace: string;
    created_at:          Date;
    default_branch:      DefaultBranch;
    tag_list:            any[];
    topics:              any[];
    ssh_url_to_repo:     string;
    http_url_to_repo:    string;
    web_url:             string;
    readme_url:          null | string;
    forks_count:         number;
    avatar_url:          null;
    star_count:          number;
    last_activity_at:    Date;
    namespace:           Namespace;
}

export enum DefaultBranch {
    Main = "main",
    Master = "master",
}

export interface Namespace {
    id:         number;
    name:       string;
    path:       string;
    kind:       Kind;
    full_path:  string;
    parent_id:  number | null;
    avatar_url: null | string;
    web_url:    string;
}

export enum Kind {
    Group = "group",
    User = "user",
}