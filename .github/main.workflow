workflow "Deploy" {
  on = "push"
  resolves = ["Deploy Website to Github Pages"]
}

action "Filter" {
  uses = "actions/bin/filter@master"
  args = "branch develop"
}

action "Install" {
  needs = ["Filter"]
  uses = "docker://node:10"
  runs = "yarn"
  args = "install"
}

action "Build" {
  needs = ["Install"]
  uses = "docker://node:10"
  runs = "yarn"
  args = "build"
}

action "Deploy Website to Github Pages" {
  needs = ["Build"]
  uses = "docker://node:10"
  runs = "yarn"
  args = "deploy"
  secrets = [
    "FIREBASE_TOKEN",
  ]
}