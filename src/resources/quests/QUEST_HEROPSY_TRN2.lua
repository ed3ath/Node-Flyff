QUEST_HEROPSY_TRN2 = {
	title = 'IDS_PROPQUEST_INC_001610',
	character = 'MaDa_Cylor',
	end_character = 'MaFl_Cuarine',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROPSY_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_UNDERSTRENGTH', quantity = 1, sex = 'Any', remove = false },
		},
		monsters = {
			{ id = 'MI_KYNSY', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_UNDERSTRENGTH', monster_id = 'MI_KYNSY', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001611',
			'IDS_PROPQUEST_INC_001612',
			'IDS_PROPQUEST_INC_001613',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001614',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001615',
		},
		completed = {
			'IDS_PROPQUEST_INC_001616',
			'IDS_PROPQUEST_INC_001617',
			'IDS_PROPQUEST_INC_001618',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001619',
		},
	}
}
