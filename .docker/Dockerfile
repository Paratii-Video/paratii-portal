FROM centos:latest

WORKDIR /build

RUN yum clean all

RUN yum -y install centos-release-scl
RUN yum -y install epel-release wget git gcc gcc-c++ make bzip2

# node
RUN wget http://nodejs.org/dist/v9.4.0/node-v9.4.0-linux-x64.tar.gz && tar --strip-components 1 -xzvf node-v* -C /usr/local \
    && ln -s /usr/local/bin/node /usr/bin/node && ln -s /usr/local/lib/node /usr/lib/node && ln -s /usr/local/bin/npm /usr/bin/npm \
    && ln -s /usr/local/bin/node-waf /usr/bin/node-waf

# yarn
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# paratii-portal
WORKDIR /paratii-portal
ADD . /paratii-portal
RUN yarn install
