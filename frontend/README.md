Области хранения данных:
    - база данных на JSON Server
    - BFF (имулятор proxy)
    - redux store с состояние приложения

Сущности приложения:
    - пользователь: БД (список пользователей), BFF (сессия текущего пользователя), redux store (отображение в браузере)
    - роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), redux store (использование на клиенте)
    - товар: БД (список товаров), redux store (отображение в браузере)
    - комментарий: БД (список комментариев), redux store (отображение в браузере)

Таблицы БД:
    - пользователи => users: id / login / password / registed_at / role_id
    - роли => roles: id / name
    - товары => items: id / price / title / image_url / content / published_at
    - комментарии => comments: id / author_id / item_id / content / publishedAt

Схема состояния на BFF
    - сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте)
    - user: id / login / roleId / session
    - items: массив item: id / price / title / imageUrl / publishedAt / commentsCount
    - item: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
    - users: массив user: id / login / registerAt/ role
