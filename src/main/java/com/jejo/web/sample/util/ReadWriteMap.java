package com.jejo.web.sample.util;

import com.jejo.web.sample.model.AbstractSvgEle;
import com.jejo.web.sample.model.Message;
import lombok.Data;

import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Data
public class ReadWriteMap<K, V> {
    private final Map<K, V> map;
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final Lock r = lock.readLock();
    private final Lock w = lock.writeLock();

    public ReadWriteMap(Map<K, V> map) {
        this.map = map;
    }

    public ByteBuffer getMapValues() {
        w.lock();
        try {
            StringBuilder sb = new StringBuilder("");
            sb.append("{\"data\":");
            sb.append("[");

            // 不要试图简化下面的if-else代码！！！不能简化，简化导致奇怪问题
            if(this.map.size() > 1) {
                Iterator<AbstractSvgEle> iterator = (Iterator<AbstractSvgEle>)map.values().iterator();
                while(iterator.hasNext()) {
                    sb.append(iterator.next().toString());
                    sb.append(",");
                }
                sb.deleteCharAt(sb.length()-1);
            }else if(this.map.size() == 1) {
                sb.append(map.values().iterator().next().toString());
            }

            sb.append("]");
            sb.append(",\"type\":");
            sb.append(Message.MsgConstant.initBoard);
            sb.append("}");
            return StringUtil.str2bb(sb.toString(), Charset.forName("utf-8"));
        } finally {
            w.unlock();
        }
    }
    public V remove(K key) {
        w.lock();
        try {
            return map.remove(key);
        } finally {
            w.unlock();
        }
    }

    public V put(K key, V value) {
        w.lock();
        try {
            return map.put(key, value);
        } finally {
            w.unlock();
        }
    }

    public V get(K key) {
        r.lock();
        try {
            return map.get(key);
        } finally  {
            r.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        final Map<Integer, String> map = new HashMap<Integer, String>();
        final ReadWriteMap<Integer, String> readWriteMap = new ReadWriteMap<Integer, String>(map);
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i <= 10; i++) {
            final int tmp = i;
            executorService.execute(new Runnable() {
                @Override
                public void run() {
                    readWriteMap.put(tmp, tmp+"");
                }
            });
            if ((i & 1) == 1) {
                executorService.execute(new Runnable() {
                    @Override
                    public void run() {
                        System.out.println(readWriteMap.get(new Random().nextInt(6)));
                    }
                });
            }
        }

        executorService.shutdown();
    }
}
