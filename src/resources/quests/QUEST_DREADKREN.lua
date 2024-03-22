QUEST_DREADKREN = {
	title = 'IDS_PROPQUEST_INC_001222',
	character = 'MaFl_Gergantes',
	end_character = 'MaFl_Gergantes',
	start_requirements = {
		min_level = 30,
		max_level = 39,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HRTDASIED', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_BKDREAD2', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_QUE_MAPDREAD2', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_GANGARD', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_BKDREAD2', monster_id = 'MI_GANGARD', probability = '1000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001223',
			'IDS_PROPQUEST_INC_001224',
			'IDS_PROPQUEST_INC_001225',
			'IDS_PROPQUEST_INC_001226',
			'IDS_PROPQUEST_INC_001227',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001228',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001229',
		},
		completed = {
			'IDS_PROPQUEST_INC_001230',
			'IDS_PROPQUEST_INC_001231',
			'IDS_PROPQUEST_INC_001232',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001233',
		},
	}
}
