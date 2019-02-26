workflow "Deploy master to firebase" {
  on = "push"
  resolves = ["Deploy firebase"]
}

action "Filter master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy firebase" {
  needs = ["Filter master"]
  uses = "./.github/deploy"
  args = "deploy:firebase"
  secrets = [
    "FIREBASE_TOKEN",
  ]
}

workflow "Deploy none master to surge" {
  on = "push"
  resolves = ["Deploy surge"]
}

action "Filter none master" {
  uses = "actions/bin/filter@master"
  args = "not branch master"
}

action "Deploy surge" {
  needs = ["Filter none master"]
  uses = "./.github/deploy"
  args = "deploy:surge"
  secrets = [
    "SURGE_LOGIN",
    "SURGE_TOKEN"
  ]
}