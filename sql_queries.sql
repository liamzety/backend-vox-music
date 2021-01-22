CREATE TABLE song (
_id BIGSERIAL NOT NULL PRIMARY KEY,
playlist_id BIGINT REFERENCES playlist(_id) ON DELETE CASCADE,
title text,
url text,
video_id text
)
