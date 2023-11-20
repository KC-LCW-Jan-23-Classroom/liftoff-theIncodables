package org.theincodables.rpgvibes.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.theincodables.rpgvibes.models.MusicTracks;

import java.util.List;

@Repository
public interface MusicTrackRepository extends CrudRepository <MusicTracks, Integer> {
    List<MusicTracks> findByGameSessionId(Integer gameSessionId);
}
