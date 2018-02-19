FROM centos:latest

MAINTAINER Leandro Barbosa <leandrobar93@gmail.com>

WORKDIR /build

RUN yum clean all

RUN yum -y install centos-release-scl
RUN yum -y install epel-release curl wget git gcc gcc-c++ make
RUN yum -y install openssl libssl-devel libudev-devel openssl-devel
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum -y install nodejs

# openssl 1.1.0

RUN wget https://www.openssl.org/source/openssl-1.1.0.tar.gz
RUN tar xzvf openssl-1.1.0.tar.gz && cd openssl-1.1.0 && ./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)' && make && make install
RUN ln -s /usr/local/lib64/libssl.so.1.1 /usr/lib64/
RUN ln -s /usr/local/lib64/libcrypto.so.1.1 /usr/lib64/
RUN rm /usr/bin/openssl
RUN ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl

# parity 1.9.0
RUN rpm -Uvh http://d1h4xl4cr1h0mo.cloudfront.net/v1.9.0/x86_64-unknown-centos-gnu/parity_1.9.0_x86_64.rpm

# yarn
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn
