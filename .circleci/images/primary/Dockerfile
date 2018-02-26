FROM ubuntu:16.04

MAINTAINER Leandro Barbosa <leandrobar93@gmail.com>

WORKDIR /build

RUN apt-get update
RUN apt install build-essential chrpath libssl-dev libxft-dev -y && apt install libfreetype6 libfreetype6-dev wget curl unzip apt-transport-https -y
RUN apt install libfontconfig1 libfontconfig1-dev -y

# openssl 1.1.0

#RUN wget https://www.openssl.org/source/openssl-1.1.0.tar.gz
#RUN tar xzvf openssl-1.1.0.tar.gz && cd openssl-1.1.0 && ./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)' && make && make install
#RUN ln -s /usr/local/lib64/libssl.so.1.1 /usr/lib64/
#RUN ln -s /usr/local/lib64/libcrypto.so.1.1 /usr/lib64/
#RUN rm /usr/bin/openssl
#RUN ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl

# parity 1.9.0
#RUN wget -q https://parity-downloads-mirror.parity.io/v1.9.0/x86_64-unknown-linux-gnu/parity_1.9.0_amd64.deb && dpkg -i parity_1.9.0_amd64.deb

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# chromedriver
RUN wget -N http://chromedriver.storage.googleapis.com/2.27/chromedriver_linux64.zip -P ~/
RUN unzip ~/chromedriver_linux64.zip -d ~/
RUN rm ~/chromedriver_linux64.zip
RUN mv -f ~/chromedriver /usr/local/share/
RUN chmod +x /usr/local/share/chromedriver
RUN ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver

# chrome

RUN apt install chromium-browser -y
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list
RUN apt update && apt install google-chrome-stable -y

# phatomjs
RUN cd ~
RUN wget https://github.com/Medium/phantomjs/archive/2.1.14.tar.gz
RUN mkdir /usr/local/share/phantomjs-2.1.14
RUN tar -czvf 2.1.14.tar.gz /usr/local/share
RUN ln -sf /usr/local/share/phantomjs-2.1.14/bin/phantomjs /usr/local/bin

# nodejs
RUN apt install nodejs -y
RUN apt install npm -y
