import Tx from "../../models/transaction";
import mongoose from "mongoose";
import Joi from "joi";

const { ObjectId } = mongoose.Types;

// 트랜잭션 작성
export const write = async ctx => {
  const schema = Joi.object().keys({
    type: Joi.string(),
    blockNumber: Joi.number(),
    blockHash: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    gas: Joi.string(),
    gasPrice: Joi.string(),
    gasUsed: Joi.number(),
    transactionHash: Joi.string(),
    typeName: Joi.string(),
    klay: Joi.number(),
    TxFee: Joi.number(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    type,
    blockNumber,
    blockHash,
    from,
    to,
    gas,
    gasPrice,
    gasUsed,
    transactionHash,
    typeName,
    klay,
    TxFee,
  } = ctx.request.body;

  const tx = new Tx({
    user: ctx.state.user,
    type: type,
    blockNumber,
    blockHash,
    from,
    to,
    gas,
    gasPrice,
    gasUsed,
    transactionHash,
    typeName,
    klay,
    TxFee,
  });

  try {
    await tx.save();
    ctx.body = tx;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 전체 트랜잭션 조회
export const list = async ctx => {
  const { username } = ctx.query;

  try {
    const txList = await Tx.find({ "user.username": username })
      .sort({ _id: -1 })
      .exec();

    ctx.body = txList.map(tx => ({
      ...tx,
      body: tx.body,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
