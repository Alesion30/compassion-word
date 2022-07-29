FROM nikolaik/python-nodejs:python3.10-nodejs18-slim

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .

RUN apt update

# mecab
RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get install -y mecab && \
    apt-get install -y libmecab-dev && \
    apt-get install -y mecab-ipadic-utf8 && \
    apt-get install -y git && \
    apt-get install -y make && \
    apt-get install -y curl && \
    apt-get install -y xz-utils && \
    apt-get install -y file && \
    apt-get install -y sudo

# mecab-ipadic-NEologd
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git && \
    cd mecab-ipadic-neologd && \
    ./bin/install-mecab-ipadic-neologd -n -y && \
    echo dicdir = `mecab-config --dicdir`"/mecab-ipadic-neologd">/etc/mecabrc && \
    sudo cp /etc/mecabrc /usr/local/etc && \
    cd ..

RUN pip install pymlask
RUN pip install mecab-python3

RUN yarn workspace backend install

EXPOSE 5000

ENTRYPOINT ["yarn", "workspace", "backend", "start"]
