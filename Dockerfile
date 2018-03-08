FROM ubuntu:16.04 as portal

# Set timezone to UTC by default
RUN ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime

# Use unicode
RUN locale-gen C.UTF-8 || true
ENV LANG=C.UTF-8

RUN apt-get update \
  && mkdir -p /usr/share/man/man1 \
  && apt-get install -y \
    git mercurial xvfb \
    locales sudo openssh-client ca-certificates tar gzip parallel \
    net-tools netcat unzip zip bzip2 gnupg curl wget build-essential curl wget

# nodejs
RUN apt autoremove -y nodejs
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt install nodejs -y

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install yarn

# paratii-portal
WORKDIR /paratii-portal
COPY . .
RUN npm install

FROM ubuntu:16.04 as db

# Set timezone to UTC by default
RUN ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime

# Use unicode
RUN locale-gen C.UTF-8 || true
ENV LANG=C.UTF-8

RUN apt-get update \
  && mkdir -p /usr/share/man/man1 \
  && apt-get install -y \
    git mercurial xvfb \
    locales sudo openssh-client ca-certificates tar gzip parallel \
    net-tools netcat unzip zip bzip2 gnupg curl wget build-essential curl wget

# nodejs
RUN apt autoremove -y nodejs
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt install nodejs -y

# paratii-portal
WORKDIR /paratii-db
RUN git clone https://github.com/Paratii-Video/paratii-db.git .
RUN npm install
