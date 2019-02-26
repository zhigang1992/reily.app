FROM node:10

LABEL "com.github.actions.name"="Yarn with Install"
LABEL "com.github.actions.description"="yarn install then yarn"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]