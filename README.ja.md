<img src="./_readme/hero.svg" />

<div align="center">

# loxygenK/better-tracking-issue

🚩 タスクリストの関係を見やすくする<br />
🌐 README は以下の言語でもご確認いただけます: [[English]](./README.md) [日本語]

[![Lint and formatting](https://github.com/loxygenK/better-tracking-issue/actions/workflows/check.yml/badge.svg)](https://github.com/loxygenK/better-tracking-issue/actions/workflows/check.yml)
[![Build and release](https://github.com/loxygenK/better-tracking-issue/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/loxygenK/better-tracking-issue/actions/workflows/build.yml)
[![Testing](https://github.com/loxygenK/better-tracking-issue/actions/workflows/test.yml/badge.svg)](https://github.com/loxygenK/better-tracking-issue/actions/workflows/test.yml)

[![codecov](https://codecov.io/gh/loxygenK/better-tracking-issue/branch/main/graph/badge.svg?token=1XbONQETTl)](https://codecov.io/gh/loxygenK/better-tracking-issue) (対応中です)

</div>

## WIP
**まだ WIP なので、バグが潜んでいるかもしれません!!**

現在は `v0.*.*` 系のタグでご利用いただけます。バグ報告等お待ちしています……!

## 何をする Action?

**このアクションは、[タスクリスト](https://docs.github.com/ja/get-started/writing-on-github/working-with-advanced-formatting/about-task-lists) への変更を検知して、追加された/削除された Issue のタイトルや本文（Tracked Issue）に、親 Issue （Tracking Issue）の番号や名前を書き込みます。**

- ️🗃️ Issue のリストで、その Issue が何に属しているのかが一目で分かるようになります。
- ️🗃️ 本文の一番下にも小さい Issue 番号のリストが追加されます。
- ️🗃️ 複数の Issue に Tracking されている場合でも表示できます。

#### 追加される要素

<img src="./_readme/textDescription.svg" />

- **Number tag** (赤色のもの)<br />
  Tracking Issue（親 Issue）の番号のリストです。タイトルの頭に追加されます。

- **Title tag** (緑色のもの)<br />
  Tracking Issue のタイトルです。1 つのみ表示されます。<br />
  どの Issue を表示するかは調整できますが、デフォルトでは、**一番最近タスクリストに Tracked Issue（子タスク）を追加した Issue** を表示しています。

- **Annotation text** (紫色のもの)<br />
  Tracking Issue の番号です（Number tag と一緒です）。タイトルの末尾に追加されます。

#### 実際の動作様子 (mp4)

https://user-images.githubusercontent.com/55672846/227727014-5aec6390-4f82-46bb-a35d-2e3fae77d27e.mp4

## 追加する
#### 例のワークフロー

```yaml
on:
  issues:
    types:
      - opened
      - edited

permissions:
  issues: write

jobs:
  update-issue:
    runs-on: ubuntu-latest
    
    steps:
      - uses: loxygenK/better-tracking-issue@v0.1.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

##### バージョンの指定

まだ v0 のため、いずれかのうちどれかを指定することをおすすめします:

- **タグの名前を完全に指定する** ( ⚠️ `v0` / ⭕ `v0.1.0` )
- **コミットハッシュを直接指定する** ( ❌ `built-result` / ⭕ `01234567...89abcdef` )

ほとんどのケースで、以下のことは避けてください!

- ️️❌ **`latest` タグを用いる**<br />
  以降も破壊的変更がある可能性があるため、`latest` タグを直接指定すると危険です!

- ️️❌ **`intn-dev-` から始まるタグを用いる**<br />
  このタグは、ワークフローの開発を目的に使われています。おそらくバグが残っているため危険です!

#### Inputs

##### `token` <sup>(🔶 必須)</sup>
Issue にアクセスするためのトークンです。**`GITHUB_TOKEN` を 使う際は、 `permission.issues: write` を設定してください!**

##### `number-tag-prefix`
Issue のタイトルの頭に追加される、Tracking Issue の番号が表示されるタグ（number tag）に使われる接頭語を指定します。
デフォルトでは `🚩` が設定されています。

##### `title-tag-prefix`
Issue のタイトルの後ろに追加される、Tracking Issue の名前が表示されるタグ（title tag）に使われる接頭語を指定します。
デフォルトでは `🚩` が設定されています。

##### `title-tag-strategy`
Title tag に表示される Issue を選択する方法を指定します。（Title tag には、現状 1 つの Issue のみ表示しかできません。）

複数の Issue にトラッキングされているときの、Title tag の挙動が不自然だと感じたら使用してみてください。

| デフォルト | 値               | Tracking Issue が追加された時  | Tracking Issue が削除された時  |
| :--------: | :--------------- | :----------------------------- | :----------------------------- |
|            | `fixed-lowest`   | Issue の番号が一番小さい Issue | Issue の番号が一番小さい Issue |
|            | `fixed-highest`  | Issue の番号が一番大きい Issue | Issue の番号が一番大きい Issue |
|     ☑️     | `latest-lowest`  | 追加された Issue               | Issue の番号が一番小さい Issue |
|            | `latest-highest` | 追加された Issue               | Issue の番号が一番大きい Issue |

> **Note**
> 今後、何らかの方法でどの Issue を表示するか直接番号で指定できるようにすることを考えています。

---

> **Note**
> 現状、設定を変更しても既存の Issue は壊れないようになっています。

> **Warning**
> この Action はまだ v0 なので、破壊的な変更が発生する可能性があります! この場合でも、既存の Issue は問題なくマイグレートできるように更新したいと考えています。

## 追加される要素

<img src="./_readme/textDescription.svg" />

- **Number tag** (赤色のもの)<br />
  Tracking Issue（親 Issue）の番号のリストです。タイトルの頭に追加されます。

- **Title tag** (緑色のもの)<br />
  Tracking Issue のタイトルです。1 つのみ表示されます。<br />
  どの Issue を表示するかは調整できますが、デフォルトでは、**一番最近タスクリストに Tracked Issue（子タスク）を追加した Issue** を表示しています。

- **Annotation text** (紫色のもの)<br />
  Tracking Issue の番号です（Number tag と一緒です）。タイトルの末尾に追加されます。

## ロードマップ
[英語の README を参照してください。](./README.md)
