# Load base image
FROM node:alpine

# Variables
ENV USER=docker
ENV GROUP=docker
ENV UID=12345
ENV GID=23456
<<<<<<< HEAD
ENV WORKDIR=/delivery

# Update image and create a user and its group
RUN apk add --update
RUN addgroup "$GROUP"
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "$USER" \
    --no-create-home \
    --uid "$UID" \
    "$USER"

# Create to application directory
RUN mkdir "$WORKDIR" \
	    && chown -R "$USER":"$GROUP" "$WORKDIR"
USER "$USER"
WORKDIR "$WORKDIR"
COPY package.json "$WORKDIR"
COPY src "$WORKDIR"
COPY tsconfig.json "$WORKDIR"
# COPY data /delivery

# Fix npm directory
# USER root
# RUN npm cache clean --force
# # RUN chown -R "$USER":"$GROUP" "/.npm"
# RUN npm -g config set user "$USER"
# USER "$USER"

# Build app and run it
RUN npm install --cache="$WORKDIR"
RUN npm run build
=======
ENV WORKDIR=/app

# Update image, create a user and its group and create application directory
RUN apk add --update \
	    && apk upgrade --available \
	    && addgroup "$GROUP" \
	    && adduser \
	    --disabled-password \
	    --gecos "" \
	    --home "$(pwd)" \
	    --ingroup "$USER" \
	    --no-create-home \
	    --uid "$UID" \
	    "$USER" \
	    && mkdir "$WORKDIR" \
	    && mkdir "$WORKDIR/test" \
	    && chown -R "$USER":"$GROUP" "$WORKDIR"

# Change to non root user and copy config files
USER "$USER"
WORKDIR "$WORKDIR"
COPY package.json tsconfig.json "$WORKDIR"/

# Build app and test it
RUN npm install --cache="$WORKDIR"
WORKDIR "$WORKDIR/test"
>>>>>>> 4d96339c4e05314d250b6a7312a010d364772dc5
CMD ["npm", "run", "test"]
