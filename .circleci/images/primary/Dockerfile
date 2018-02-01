FROM centos:latest

MAINTAINER Leandro Barbosa <leandrobar93@gmail.com>

WORKDIR /build

RUN yum clean all
<<<<<<< HEAD

RUN yum -y install centos-release-scl
RUN yum -y install epel-release curl wget git gcc gcc-c++ make
RUN yum -y install openssl libssl-devel libudev-devel openssl-devel
RUN curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
RUN yum -y install nodejs
RUN yum -y install chromium

# openssl 1.1.0
RUN yum groups mark convert
RUN yum groups mark convert "Development Tools"
RUN yum groupinstall -y "Development Tools"

RUN yum -y install centos-release-scl
RUN yum -y install epel-release curl wget git gcc gcc-c++ make
RUN yum -y install openssl libssl-devel libudev-devel openssl-devel
RUN curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
RUN yum -y install nodejs
RUN yum -y install chromium

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

# chromedriver
RUN rpm -Uvh http://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/c/chromedriver-61.0.3163.100-1.el7.x86_64.rpm
<<<<<<< HEAD
RUN yum install -y Xvfb
RUN yum install -y chromedriver
RUN export CHROME_BIN=/usr/bin/chromium-browser

# phatomjs

RUN yum install -y fontconfig freetype freetype-devel fontconfig-devel libstdc++
RUN rpm -Uvh --force http://mirror.centos.org/centos/7/os/x86_64/Packages/bzip2-libs-1.0.6-13.el7.x86_64.rpm
RUN yum install -y bzip2
RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2
RUN bunzip2 phantomjs*.tar.bz2
RUN tar xvf phantomjs*.tar
RUN cp phantomjs*/bin/phantomjs /usr/bin/phantomjs

# firefox

# RUN yum -y install firefox  libXfont Xorg
# RUN yum -y groupinstall "X Window System" "Desktop" "Fonts" "General Purpose Desktop"

RUN npm install fibers && npm install scrypt
