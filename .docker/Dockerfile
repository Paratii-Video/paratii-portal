FROM centos:latest

WORKDIR /build

RUN yum clean all

RUN yum -y install centos-release-scl
RUN yum -y install epel-release curl wget git gcc gcc-c++ make bzip2 unzip
RUN yum -y install openssl libssl-devel libudev-devel openssl-devel
RUN wget http://nodejs.org/dist/v9.4.0/node-v9.4.0-linux-x64.tar.gz && tar --strip-components 1 -xzvf node-v* -C /usr/local \
    && ln -s /usr/local/bin/node /usr/bin/node && ln -s /usr/local/lib/node /usr/lib/node && ln -s /usr/local/bin/npm /usr/bin/npm \
    && ln -s /usr/local/bin/node-waf /usr/bin/node-waf

# yarn
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# install chrome

RUN yum -y install chromium
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
RUN yum -y install ./google-chrome-stable_current_*.rpm
RUN export CHROME_BIN=/usr/bin/google-chrome

RUN export CHROMEDRIVER_RELEASE=$(curl --location --fail --retry 3 http://chromedriver.storage.googleapis.com/LATEST_RELEASE) \
      && curl --silent --show-error --location --fail --retry 3 --output /tmp/chromedriver_linux64.zip "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_RELEASE/chromedriver_linux64.zip" \
      && cd /tmp \
      && unzip chromedriver_linux64.zip \
      && rm -rf chromedriver_linux64.zip \
      && mv chromedriver /usr/local/bin/chromedriver \
      && chmod +x /usr/local/bin/chromedriver \
      && chromedriver --version

# paratii-portal
WORKDIR /paratii-portal
ADD . /paratii-portal
RUN yarn install
