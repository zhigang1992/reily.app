workflow "Deploy" {
  on = "push"
  resolves = ["Deploy Firebase", "Deploy Surge"]
}

action "Filter Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy Firebase" {
  needs = ["Filter Master"]
  uses = "./.github/deploy"
  args = "deploy:firebase"
  secrets = [
    "FIREBASE_TOKEN",
  ]
}

action "Filter None Master" {
  uses = "actions/bin/filter@master"
  args = "not branch master"
}

action "Deploy Surge" {
  needs = ["Filter None Master"]
  uses = "./.github/deploy"
  args = "deploy:surge"
  secrets = [
    "SURGE_LOGIN",
    "SURGE_TOKEN"
  ]
}