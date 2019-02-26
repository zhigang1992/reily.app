FROM node:10

LABEL "com.github.actions.name"="Yarn"
LABEL "com.github.actions.description"="yarn install and build"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]