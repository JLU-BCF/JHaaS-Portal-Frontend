FROM node:20 as develop

ARG USER='1000:1000'
ARG CACHEDIR=/jhaas-cache
ARG APPDIR=/jhaas-app

RUN usermod -u ${USER%:*} -g ${USER#*:} -m -d ${CACHEDIR} node
RUN mkdir -p ${APPDIR} && chown -R ${USER} ${APPDIR}

COPY docker-entrypoint-dev.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER ${USER}
VOLUME ${CACHEDIR}
VOLUME ${APPDIR}
WORKDIR ${APPDIR}

ENTRYPOINT ["/entrypoint.sh"]

FROM node:20 AS build

ARG APPDIR=/jhaas-app

WORKDIR ${APPDIR}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.23-alpine AS production

ARG APPDIR=/jhaas-app

COPY --from=build ${APPDIR}/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
