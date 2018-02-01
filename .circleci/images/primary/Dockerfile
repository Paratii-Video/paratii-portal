FROM centos:latest

MAINTAINER Leandro Barbosa <leandrobar93@gmail.com>

WORKDIR /build

RUN yum clean all
RUN yum groups mark convert
RUN yum groups mark convert "Development Tools"
RUN yum groupinstall -y "Development Tools"

RUN yum -y install epel-release curl wget git centos-release-scl gcc gcc-c++
RUN yum -y install openssl libssl-devel libudev-devel openssl-devel

RUN wget https://www.openssl.org/source/openssl-1.1.0.tar.gz
RUN tar xzvf openssl-1.1.0.tar.gz && cd openssl-1.1.0 && ./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)' && make && make install
RUN ln -s /usr/local/lib64/libssl.so.1.1 /usr/lib64/
RUN ln -s /usr/local/lib64/libcrypto.so.1.1 /usr/lib64/
RUN rm /usr/bin/openssl
RUN ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl

RUN rpm -Uvh http://d1h4xl4cr1h0mo.cloudfront.net/v1.9.0/x86_64-unknown-centos-gnu/parity_1.9.0_x86_64.rpm
RUN wget http://nodejs.org/dist/v9.4.0/node-v9.4.0-linux-x64.tar.gz
RUN tar --strip-components 1 -xzvf node-v* -C /usr/local
RUN ln -s /usr/local/bin/node /usr/bin/node
RUN ln -s /usr/local/lib/node /usr/lib/node
RUN ln -s /usr/local/bin/npm /usr/bin/npm
RUN ln -s /usr/local/bin/node-waf /usr/bin/node-waf
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
RUN yum -y install yarn
RUN yum -y install chromium
RUN rpm -Uvh http://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/c/chromedriver-61.0.3163.100-1.el7.x86_64.rpm
