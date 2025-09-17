QUEST_HEROKNI_TRN5 = {
	title = 'IDS_PROPQUEST_INC_001410',
	character = 'MaDa_Lobiet',
	end_character = 'MaDa_Boneper',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROKNI_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
		job = 'JOB_KNIGHT',
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_VENHEART', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_GUARDMON1', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_VENHEART', monster_id = 'MI_GUARDMON1', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001411',
			'IDS_PROPQUEST_INC_001412',
			'IDS_PROPQUEST_INC_001413',
			'IDS_PROPQUEST_INC_001414',
			'IDS_PROPQUEST_INC_001415',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001416',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001417',
		},
		completed = {
			'IDS_PROPQUEST_INC_001418',
			'IDS_PROPQUEST_INC_001419',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001420',
		},
	}
}
